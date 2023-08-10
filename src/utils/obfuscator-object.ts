const typeAcceptToFormats: string[] = ['number', 'string'];
const dataObfuscated = [
  {
    keys: ['chave8', 'chave4', 'chave5'],
    obfuscateWith: (value: string | number) => `***${value}`,
  },
];

export function obfuscatorObject(params: any[]) {
  const keys = Object.keys(params);
  keys.length > 0 &&
    keys.forEach((element: any) => {
      if (typeof params[element] === 'object' && params[element] != null) {
        const findValue = dataObfuscated.find((obfuscated) =>
          obfuscated.keys.includes(element),
        );
        if (findValue && typeAcceptToFormats.includes(typeof params[element])) {
          params[element] = findValue.obfuscateWith(params[element]);
        }
        return obfuscatorObject(params[element]);
      } else if (
        typeof params[element] !== 'object' &&
        params[element] != null
      ) {
        const findValue = dataObfuscated.find((obfuscated) =>
          obfuscated.keys.includes(element),
        );
        if (findValue && typeAcceptToFormats.includes(typeof params[element])) {
          params[element] = findValue.obfuscateWith(params[element]);
        }
      }
    });
}
