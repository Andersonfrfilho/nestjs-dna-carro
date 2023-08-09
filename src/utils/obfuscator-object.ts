const objetoExemplo = {
  nome: 'João',
  idade: 30,
  endereco: {
    rua: 'Rua Principal',
    cidade: 'Cidade Exemplo',
  },
};

function obfuscatorObject(object: any, replaceInfos: any[]): any {
  Object.keys(object).forEach((item) => {
    console.log(item);
  });
  return {};
}
