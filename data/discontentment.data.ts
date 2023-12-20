export default {
    watch: [ '../public/discontentment/*.jpg' ],
    load( watchedFiles ) {
        return watchedFiles;
    }
}