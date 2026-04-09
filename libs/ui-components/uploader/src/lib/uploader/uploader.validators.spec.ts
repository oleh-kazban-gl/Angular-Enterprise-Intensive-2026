import { fileType, maxFileSize, requiredFiles, maxFiles, maxTotalSize, noDuplicateFiles } from './uploader.validators';

function makeFile(name: string, type: string, size: number): File {
  return new File([new ArrayBuffer(size)], name, { type });
}

describe('fileType', () => {
  const validator = fileType(['image/png', 'image/jpeg']);

  it('returns null for an accepted MIME type', () => {
    const file = makeFile('photo.png', 'image/png', 100);
    expect(validator(file)).toBeNull();
  });

  it('returns error for an unaccepted MIME type', () => {
    const file = makeFile('doc.pdf', 'application/pdf', 100);
    expect(validator(file)).toEqual({ fileType: { expected: 'PNG, JPEG' } });
  });

  it('attaches acceptedTypes metadata to the validator', () => {
    const v = fileType(['image/png', 'image/webp']) as ReturnType<typeof fileType> & { acceptedTypes: string[] };
    expect(v.acceptedTypes).toEqual(['image/png', 'image/webp']);
  });
});

describe('maxFileSize', () => {
  const validator = maxFileSize(1024 * 1024); // 1 MB

  it('returns null when file is within limit', () => {
    const file = makeFile('small.png', 'image/png', 500 * 1024);
    expect(validator(file)).toBeNull();
  });

  it('returns null when file is exactly at limit', () => {
    const file = makeFile('exact.png', 'image/png', 1024 * 1024);
    expect(validator(file)).toBeNull();
  });

  it('returns error when file exceeds limit', () => {
    const file = makeFile('big.png', 'image/png', 2 * 1024 * 1024);
    const result = validator(file);
    expect(result).not.toBeNull();
    expect(result!['maxFileSize']).toBeDefined();
    expect(result!['maxFileSize'].expected).toBe('1.0 MB');
    expect(result!['maxFileSize'].actual).toBe('2.0 MB');
  });
});

describe('requiredFiles', () => {
  const validator = requiredFiles();

  it('returns null when at least one file present', () => {
    const files = [makeFile('a.png', 'image/png', 100)];
    expect(validator(files)).toBeNull();
  });

  it('returns error for empty array', () => {
    expect(validator([])).toEqual({ requiredFiles: true });
  });
});

describe('maxFiles', () => {
  const validator = maxFiles(3);

  it('returns null when within limit', () => {
    const files = [makeFile('a.png', 'image/png', 100), makeFile('b.png', 'image/png', 100)];
    expect(validator(files)).toBeNull();
  });

  it('returns null when exactly at limit', () => {
    const files = [1, 2, 3].map(i => makeFile(`${i}.png`, 'image/png', 100));
    expect(validator(files)).toBeNull();
  });

  it('returns error when exceeding limit', () => {
    const files = [1, 2, 3, 4].map(i => makeFile(`${i}.png`, 'image/png', 100));
    expect(validator(files)).toEqual({ maxFiles: { actual: 4, expected: 3 } });
  });
});

describe('maxTotalSize', () => {
  const validator = maxTotalSize(1024 * 1024); // 1 MB

  it('returns null when total size is within limit', () => {
    const files = [makeFile('a.png', 'image/png', 400 * 1024), makeFile('b.png', 'image/png', 400 * 1024)];
    expect(validator(files)).toBeNull();
  });

  it('returns error when total size exceeds limit', () => {
    const files = [makeFile('a.png', 'image/png', 700 * 1024), makeFile('b.png', 'image/png', 700 * 1024)];
    const result = validator(files);
    expect(result).not.toBeNull();
    expect(result!['maxTotalSize']).toBeDefined();
  });
});

describe('noDuplicateFiles', () => {
  const validator = noDuplicateFiles();

  it('returns null when all files are unique', () => {
    const files = [makeFile('a.png', 'image/png', 100), makeFile('b.png', 'image/png', 200)];
    expect(validator(files)).toBeNull();
  });

  it('returns error when duplicate files are present', () => {
    const file = makeFile('photo.png', 'image/png', 100);
    const result = validator([file, file]);
    expect(result).not.toBeNull();
    expect(result!['noDuplicateFiles'].actual).toContain('photo.png');
  });

  it('returns null for empty array', () => {
    expect(validator([])).toBeNull();
  });
});
