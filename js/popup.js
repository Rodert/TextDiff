/**
 * TextDiff - 文本差异对比工具
 * 弹出界面交互逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const originalTextArea = document.getElementById('original-text');
  const compareTextArea = document.getElementById('compare-text');
  const compareButton = document.getElementById('compare-btn');
  const clearButton = document.getElementById('clear-btn');
  const diffResult = document.getElementById('diff-result');
  
  // 调整弹出窗口大小以适应屏幕
  function adjustPopupSize() {
    const width = Math.min(1200, window.screen.availWidth * 0.9);
    const height = Math.min(800, window.screen.availHeight * 0.9);
    
    // 尝试调整窗口大小
    try {
      window.resizeTo(width, height);
    } catch (e) {
      console.log('无法调整窗口大小，可能是浏览器限制');
    }
    
    // 确保内容适应窗口大小
    document.body.style.width = width + 'px';
    document.body.style.height = height + 'px';
  }
  
  // 尝试调整窗口大小
  adjustPopupSize();
  
  // 窗口大小变化时重新调整
  window.addEventListener('resize', function() {
    adjustPopupSize();
  });
  
  // 从存储中恢复之前的输入
  chrome.storage.local.get(['originalText', 'compareText'], function(result) {
    if (result.originalText) originalTextArea.value = result.originalText;
    if (result.compareText) compareTextArea.value = result.compareText;
  });
  
  // 比较按钮点击事件
  compareButton.addEventListener('click', function() {
    const originalText = originalTextArea.value;
    const compareText = compareTextArea.value;
    
    // 保存当前输入到存储
    chrome.storage.local.set({
      originalText: originalText,
      compareText: compareText
    });
    
    // 执行差异比较
    const diffHtml = TextDiff.compare(originalText, compareText);
    diffResult.innerHTML = diffHtml || '<p>没有发现差异</p>';
  });
  
  // 清除按钮点击事件
  clearButton.addEventListener('click', function() {
    originalTextArea.value = '';
    compareTextArea.value = '';
    diffResult.innerHTML = '';
    
    // 清除存储
    chrome.storage.local.remove(['originalText', 'compareText']);
  });
  
  // 添加粘贴快捷键支持
  originalTextArea.addEventListener('keydown', function(e) {
    // Ctrl+V 或 Command+V
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      // 默认粘贴行为会自动处理
    }
  });
  
  compareTextArea.addEventListener('keydown', function(e) {
    // Ctrl+V 或 Command+V
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      // 默认粘贴行为会自动处理
    }
  });
});