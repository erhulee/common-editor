export function maxAreaRect(aspectRatio: number, _containerWidth: number, _containerHeight: number, padding: { x: number, y: number }) {

    const containerHeight = _containerHeight - 2 * padding.y;
    const containerWidth = _containerWidth - 2 * padding.x;

    // 初始化最大面积和对应的宽度、高度
    let maxArea = 0;
    let maxWidth = 0;
    let maxHeight = 0;

    // 遍历所有可能的宽度
    for (let width = 1; width <= containerWidth; width++) {
        // 根据长宽比计算对应的高度
        const height = width / aspectRatio;

        // 如果高度超出容器的高度，则结束循环
        if (height > containerHeight) {
            break;
        }

        // 计算当前宽度和高度下的矩形面积
        const area = width * height;

        // 如果当前面积大于最大面积，则更新最大面积和对应的宽度、高度
        if (area > maxArea) {
            maxArea = area;
            maxWidth = width;
            maxHeight = height;
        }
    }

    // 返回最大宽度、最大高度和对应的最大面积
    return {
        maxWidth: maxWidth,
        maxHeight: maxHeight,
    };
}