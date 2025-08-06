/**
 * TextDiff - 文本差异对比工具
 * 基于最长公共子序列算法实现文本差异比较
 */

class TextDiff {
  /**
   * 比较两段文本并返回差异结果
   * @param {string} text1 - 原始文本
   * @param {string} text2 - 比较文本
   * @returns {string} - 带有HTML标记的差异结果
   */
  static compare(text1, text2) {
    if (!text1 && !text2) return '';
    if (!text1) return this.markAdded(text2);
    if (!text2) return this.markRemoved(text1);
    
    // 将文本分割成行
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    // 计算行级别的差异
    const diff = this.computeDiff(lines1, lines2);
    
    return diff;
  }
  
  /**
   * 计算两个文本数组的差异
   * @param {string[]} lines1 - 原始文本行
   * @param {string[]} lines2 - 比较文本行
   * @returns {string} - 带有HTML标记的差异结果
   */
  static computeDiff(lines1, lines2) {
    const matrix = this.buildLCSMatrix(lines1, lines2);
    return this.backtrackLCS(matrix, lines1, lines2, lines1.length, lines2.length);
  }
  
  /**
   * 构建最长公共子序列矩阵
   * @param {string[]} lines1 - 原始文本行
   * @param {string[]} lines2 - 比较文本行
   * @returns {number[][]} - LCS矩阵
   */
  static buildLCSMatrix(lines1, lines2) {
    const matrix = Array(lines1.length + 1).fill().map(() => Array(lines2.length + 1).fill(0));
    
    for (let i = 1; i <= lines1.length; i++) {
      for (let j = 1; j <= lines2.length; j++) {
        if (lines1[i - 1] === lines2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1] + 1;
        } else {
          matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
        }
      }
    }
    
    return matrix;
  }
  
  /**
   * 回溯LCS矩阵生成差异结果
   * @param {number[][]} matrix - LCS矩阵
   * @param {string[]} lines1 - 原始文本行
   * @param {string[]} lines2 - 比较文本行
   * @param {number} i - 当前行索引1
   * @param {number} j - 当前行索引2
   * @returns {string} - 带有HTML标记的差异结果
   */
  static backtrackLCS(matrix, lines1, lines2, i, j) {
    if (i === 0 && j === 0) {
      return '';
    } else if (i === 0) {
      return this.backtrackLCS(matrix, lines1, lines2, i, j - 1) + this.markAdded(lines2[j - 1] + '\n');
    } else if (j === 0) {
      return this.backtrackLCS(matrix, lines1, lines2, i - 1, j) + this.markRemoved(lines1[i - 1] + '\n');
    } else if (lines1[i - 1] === lines2[j - 1]) {
      return this.backtrackLCS(matrix, lines1, lines2, i - 1, j - 1) + this.markUnchanged(lines1[i - 1] + '\n');
    } else if (matrix[i][j - 1] >= matrix[i - 1][j]) {
      return this.backtrackLCS(matrix, lines1, lines2, i, j - 1) + this.markAdded(lines2[j - 1] + '\n');
    } else {
      return this.backtrackLCS(matrix, lines1, lines2, i - 1, j) + this.markRemoved(lines1[i - 1] + '\n');
    }
  }
  
  /**
   * 标记添加的文本
   * @param {string} text - 添加的文本
   * @returns {string} - 带有HTML标记的文本
   */
  static markAdded(text) {
    return `<span class="diff-added">${this.escapeHtml(text)}</span>`;
  }
  
  /**
   * 标记删除的文本
   * @param {string} text - 删除的文本
   * @returns {string} - 带有HTML标记的文本
   */
  static markRemoved(text) {
    return `<span class="diff-removed">${this.escapeHtml(text)}</span>`;
  }
  
  /**
   * 标记未变化的文本
   * @param {string} text - 未变化的文本
   * @returns {string} - 带有HTML标记的文本
   */
  static markUnchanged(text) {
    return `<span class="diff-unchanged">${this.escapeHtml(text)}</span>`;
  }
  
  /**
   * 转义HTML特殊字符
   * @param {string} text - 需要转义的文本
   * @returns {string} - 转义后的文本
   */
  static escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  /**
   * 字符级别的差异比较（更精细的比较）
   * @param {string} text1 - 原始文本
   * @param {string} text2 - 比较文本
   * @returns {string} - 带有HTML标记的差异结果
   */
  static compareChars(text1, text2) {
    // 这里可以实现更精细的字符级别比较
    // 为了简化，这个版本暂不实现
    return this.compare(text1, text2);
  }
}