const hasSegment = (segment, segments) => {
    const segmentParts = segment.split('/').filter(Boolean);
    const [segmentPart] = segmentParts;
    const firstPartIndex = segments.findIndex((s) => s.toLowerCase() === segmentPart.toLowerCase());
    if (firstPartIndex > -1) {
        return segmentParts.reduce((acc, part, index) => {
            return acc && segments[firstPartIndex + index].toLowerCase() === part.toLowerCase();
        }, true);
    }
    return false;
};

console.log(hasSegment('/page/category', ['d', 'page', 'category', '1223']));
