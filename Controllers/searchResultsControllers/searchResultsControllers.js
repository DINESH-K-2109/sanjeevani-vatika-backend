const mongoose = require("mongoose");
// this is the search model it have beeen prepared if it can be used in the future


const Search = require("../../Models/searchResultsModel/searchResultsModel");
// importing the blog model from the model folder

const Blog = require("../../Models/blogModel");



// start of getting blogs/posts  from the database;


module.exports.searchResults = async (req, res) => {
    try {
        const query = req.body.searchData.toString().trim();
        
        if (!query) {
            return res.json({
                response: [],
                status: true,
                message: "No search query provided."
            });
        }

        // Split the query into words and remove empty strings
        const queryWords = query.toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map(word => word.trim());

        // Create the search conditions
        const searchConditions = queryWords.map(word => ({
            $or: [
                { title: { $regex: word, $options: 'i' } },
                { author: { $regex: word, $options: 'i' } },
                { category: { $regex: word, $options: 'i' } },
                { content: { $regex: word, $options: 'i' } },
                { tags: { $regex: word, $options: 'i' } }
            ]
        }));

        // Find blogs that match any of the conditions
        const blogs = await Blog.find({
            $or: searchConditions
        }).select('title author category tags content imageUrl createdAt');

        // Calculate relevance score for each blog
        const scoredBlogs = blogs.map(blog => {
            let score = 0;
            const blogData = {
                title: blog.title.toLowerCase(),
                author: blog.author.toLowerCase(),
                category: blog.category.toLowerCase(),
                tags: blog.tags.map(tag => tag.toLowerCase()),
                content: blog.content.toLowerCase()
            };

            // Exact phrase match in title (highest priority)
            if (blogData.title.includes(query.toLowerCase())) {
                score += 50;
            }

            // Word-by-word scoring
            queryWords.forEach(word => {
                // Title matches (high priority)
                if (blogData.title.includes(word)) {
                    score += 10;
                    // Bonus for word at the start of title
                    if (blogData.title.startsWith(word)) {
                        score += 5;
                    }
                }

                // Author matches (medium priority)
                if (blogData.author.includes(word)) {
                    score += 8;
                }

                // Category matches (medium priority)
                if (blogData.category.includes(word)) {
                    score += 8;
                }

                // Tag matches (medium-high priority)
                if (blogData.tags.some(tag => tag.includes(word))) {
                    score += 9;
                    // Exact tag match bonus
                    if (blogData.tags.includes(word)) {
                        score += 3;
                    }
                }

                // Content matches (lower priority but still relevant)
                if (blogData.content.includes(word)) {
                    score += 5;
                    
                    // Bonus for word frequency in content
                    const wordFrequency = (blogData.content.match(new RegExp(word, 'g')) || []).length;
                    score += Math.min(wordFrequency / 2, 5); // Cap the bonus at 5 points
                }
            });

            // Bonus for matching all query words
            const matchesAllWords = queryWords.every(word => 
                blogData.title.includes(word) ||
                blogData.author.includes(word) ||
                blogData.category.includes(word) ||
                blogData.tags.some(tag => tag.includes(word)) ||
                blogData.content.includes(word)
            );
            if (matchesAllWords) {
                score += 20;
            }

            // Recency boost (posts from the last 30 days)
            const daysSinceCreation = (new Date() - new Date(blog.createdAt)) / (1000 * 60 * 60 * 24);
            if (daysSinceCreation <= 30) {
                score += (30 - daysSinceCreation) / 30 * 5; // Max 5 points for recency
            }

            return {
                ...blog.toObject(),
                relevanceScore: score,
                matchDetails: {
                    exactPhraseMatch: blogData.title.includes(query.toLowerCase()),
                    matchesAllWords,
                    wordMatches: queryWords.map(word => ({
                        word,
                        inTitle: blogData.title.includes(word),
                        inAuthor: blogData.author.includes(word),
                        inCategory: blogData.category.includes(word),
                        inTags: blogData.tags.some(tag => tag.includes(word)),
                        inContent: blogData.content.includes(word)
                    }))
                }
            };
        });

        // Sort by relevance score (highest to lowest)
        scoredBlogs.sort((a, b) => b.relevanceScore - a.relevanceScore);

        res.json({
            response: scoredBlogs,
            status: true,
            message: "Search results found.",
            totalResults: scoredBlogs.length,
            searchMetadata: {
                queryWords,
                totalMatches: scoredBlogs.length,
                topScore: scoredBlogs[0]?.relevanceScore || 0
            }
        });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ 
            status: false, 
            message: "Error processing search request",
            error: err.message 
        });
    }
};

// end of the getting blogs from the database;



