---
layout: post
title: "LeetCode-Trapping Rain Water"
description: "Solving Trapping Rain Water Problem"
comments: true
keywords: "leetcode, array, algorithm, data structure"
---
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

For example,
Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

![](https://leetcode.com/static/images/problemset/rainwatertrap.png)

Thought Process: The water can only be contained as tall as the shorter side of wall. So We can scan the array from both right and left, and maintain a mininum height. Add height difference between either left height and right height with the mininum height to the area.
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
      int n = height.size(), l = 0, r = n-1, water = 0, minHeight = 0;
      while(l<r){
        while(l<r && height[l]<=minHeight)
          water += minHeight-height[l++];
        while(l<r && height[r]<=minHeight)
          water += minHeight-height[r--];
        minHeight = min(height[l], height[r]);
      }
      return water;
    }
};
```
