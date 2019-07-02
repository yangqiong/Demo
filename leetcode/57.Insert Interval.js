/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    if (intervals.length === 0) return [newInterval]
    if (newInterval[1] < intervals[0][0]) {
        intervals.unshift(newInterval)
        return intervals
    }
    if (intervals[intervals.length - 1][1] < newInterval[0]) {
        intervals.push(newInterval)
        return intervals
    }

    var result = []
    var temp = []
    var max = null;
    for (var i = 0; i < intervals.length; i++) {
        if (intervals[i][1] < newInterval[0]) {
            result.push(intervals[i])
        } else {
            if (temp[0] === undefined) {
                temp[0] = Math.min(intervals[i][0], newInterval[0])
            }
        }
        if (intervals[i][0] > newInterval[1]) {
            max = i
            break;
        }
    }

    if (max && max > 0) {
        temp[1] = Math.max(intervals[max - 1][1], newInterval[1])
    } else {
        temp[1] = Math.max(intervals[intervals.length - 1][1], newInterval[1])

    }
    result.push(temp)

    if (max) {
        for (var i = max; i < intervals.length; i++) {
            result.push(intervals[i])
        }
    }

    return result
};