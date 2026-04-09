import { FormatBytesPipe } from './format-bytes.pipe';

describe('FormatBytesPipe', () => {
  const pipe = new FormatBytesPipe();

  it('formats 0 bytes as "0 B"', () => {
    expect(pipe.transform(0)).toBe('0 B');
  });

  it('formats bytes below 1024 as B', () => {
    expect(pipe.transform(512)).toBe('512 B');
    expect(pipe.transform(1023)).toBe('1023 B');
  });

  it('formats exactly 1024 bytes as 1.0 KB', () => {
    expect(pipe.transform(1024)).toBe('1.0 KB');
  });

  it('formats bytes in KB range', () => {
    expect(pipe.transform(1536)).toBe('1.5 KB');
    expect(pipe.transform(1024 * 1024 - 1)).toMatch(/KB$/);
  });

  it('formats exactly 1 MB', () => {
    expect(pipe.transform(1024 * 1024)).toBe('1.0 MB');
  });

  it('formats bytes in MB range', () => {
    expect(pipe.transform(1024 * 1024 * 1.5)).toBe('1.5 MB');
  });

  it('formats large values in MB', () => {
    expect(pipe.transform(1024 * 1024 * 10)).toBe('10.0 MB');
  });
});
