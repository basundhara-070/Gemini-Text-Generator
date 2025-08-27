const YoutubeSearchApi  = require("youtube-search-api");

async function searchResults(query) {
    try {
        const results = await YoutubeSearchApi.GetListByKeyword(query + " full course", false, 6);
        return transformResponse(results);
    } catch (err) {
        throw new Error("Failed to generate AI content: " + err.message);
    }
}

function transformResponse(apiResponse) {
  if (!apiResponse.items) return [];

  return apiResponse.items.map((item) => {
    const bestThumbnail =
      item.thumbnail?.thumbnails[item.thumbnail.thumbnails.length - 1]?.url ||
      "";

    return {
      id : item.id,
      title: item.title,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      thumbnail: bestThumbnail,
      channel: item.channelTitle,
    };
  });
}


module.exports = { searchResults };