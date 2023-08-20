const typeAcceptToFormats: string[] = ['number', 'string'];

type ObfuscateWithParamsDto = string | number;
interface Obfuscated {
  keys: Array<string>;
  obfuscateWith: (value: ObfuscateWithParamsDto) => string;
}
const dataObfuscated: Obfuscated[] = [
  {
    keys: ['chave8', 'chave4', 'chave5'],
    obfuscateWith: (value: ObfuscateWithParamsDto) => `***${value}`,
  },
  {
    keys: ['base64'],
    obfuscateWith: () => `***`,
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
