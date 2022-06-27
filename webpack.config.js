var config = Encore.getWebpackConfig();
config.node = { fs: 'empty' };

module.exports = {
    resolve: {
        fallback: {
            "fs": false
        },
    }
}