import * as tagGroupRepo from './tag-group-repository'
import * as bookmarkRepo from './bookmark-repository'
import * as bookmarkParser from './chrome-bookmark-parser'
import * as idb from './idb'

define(function (require, exports, module) {

    function loadBookmarks(bookmarkTreeNodes, op) {
        var results = bookmarkParser.parseChromeBookmarks(bookmarkTreeNodes),
            bookmarks = results.bookmarks;

        _.each(bookmarks, function (bookmark) {
            bookmark.tags = _.map(bookmark.tags, function (str) {
                return str.toLowerCase();
            });
            bookmark.dateAdded = new Date(bookmark.dateAdded);
        });

        bookmarkRepo.addAll(bookmarks, op);
    }

    /**
     * init should be called first and wait for loadIndexedDB completed before calling other methods
     */
    exports.init = function (op) {
        idb.loadIndexedDB({
            success: function () {
                tagGroupRepo.loadAllTagsToCache(op);
            }
        });
    };

    exports.loadChromeBookmarks = function (bookmarkTreeNodes, op) {
        loadBookmarks(bookmarkTreeNodes, op);
    };

    exports.loadBookmarksFromChrome = function (op) {
        chrome.bookmarks.getTree(function (tree) {
            loadBookmarks(tree[0].children, op);
        });
    };

});
