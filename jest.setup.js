// Mock canvas context
const mockContext = {
  fillStyle: null,
  fillRect: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {}
};

// Mock canvas element
const mockCanvas = {
  getContext: () => mockContext,
  style: {}
};

// Mock audio element
const mockAudio = {
  canPlayType: () => true
};

// Mock document createElement
document.createElement = (type) => {
  if (type === 'canvas') {
    return mockCanvas;
  }
  if (type === 'audio') {
    return mockAudio;
  }
  return null;
};