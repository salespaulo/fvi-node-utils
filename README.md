# i-node-utils

-   `npm run compile`: Executa a limpeza dos arquivos e diretorios.
-   `npm run debug-test`: Executa os testes unitários com o DEBUG ativo.
-   `npm run test`: Executa os testes unitários.
-   `npm run debug-dev`: Executa os testes unitários e espera por alterações com o DEBUG ativo.
-   `npm run dev`: Executa os testes unitários e espera por alterçãoes.
-   `npm run prod`: Executa o código com NODE_ENV=production.
-   `npm run coverage`: Executa os testes unitários e retorna a cobertura dos códigos através do [nyc](https://github.com/istanbuljs/nyc/)
-   `npm run release`: Inicia uma nova release de versão incrementando o **patch**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:minor`: Inicia uma nova release de versão incrementando o **minor**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:major`: Inicia uma nova release de versão incrementando o **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finaliza a release, ou seja, realiza o [git flow](https://github.com/nvie/gitflow/) release finish.

## Intelligir - Node Utilities

Biblioteca intelligir de funções e bibliotecas utilitárias para programação em Node.js.

### Core Utilities

```javascript
const {
    env,
    sugar,
    debug,
    logger,
    string,
    config,
    blocked,
    arrays,
    objects,
} = require('i-node-utils')
```

-   **sugar**: [sugar.js](https://sugarjs.com/)
-   **debug**: [debug-safe.js](https://www.npmjs.com/package/debug)
-   **logger**: [pino](https://github.com/pinojs/pino.git)
-   **string**: [voca.js](https://vocajs.com/)
-   **config**: [convict.js](https://github.com/mozilla/node-convict), uma implementação que busca sempre arquivos _\*.json_ no diretório raiz do projeto.
-   **blocked**: [blocked.js](https://github.com/visionmedia/node-blocked#readme)
-   **env**: Ver documentação abaixo.
-   **arrays**: Ver documentação abaixo.
-   **objects**: Ver documentação abaixo.

### Env Utilities

```javascript
const {
    DEVELOPMENT,
    LOCALHOST,
    TEST,
    STAGING,
    PRODUCTION,
    IS_ENV,
    IS_DEV,
    IS_TEST,
    IS_LOCAL,
    IS_STAG,
    IS_PROD,
} = require('i-node-utils/app/env)
```

-   **DEVELOPMENT**: Constanten que representa a `String` _development_.
-   **LOCALHOST**: Constanten que representa a `String` _localhost_.
-   **TEST**: Constanten que representa a `String` _test_.
-   **STAGING**: Constanten que representa a `String` _staging_.
-   **PRODUCTION**: Constanten que representa a `String` _production_.
-   **IS_ENV(node_env: string)**: Função que recebe uma `String` e retorna a validação `process.env.NODE_ENV === param`.
-   **IS_DEV**: Propriedade booleana `true: process.env.NODE_ENV === DEVELOPMENT`, ou `false`.
-   **IS_TEST**: Propriedade booleana `true: process.env.NODE_ENV === TEST`, ou `false`.
-   **IS_LOCAL**: Propriedade booleana `true: process.env.NODE_ENV === LOCALHOST`, ou `false`.
-   **IS_STAG**: Propriedade booleana `true: process.env.NODE_ENV === STAGING`, ou `false`.
-   **IS_PROD**: Propriedade booleana `true: process.env.NODE_ENV === PRODUCTION`, ou `false`.

### Array Utilities

```javascript
const {
    chunk,
    flatmap,
    asyncFilter,
    arrayToBase64,
    arrayToJson,
    collect,
} = require('i-node-utils/app/arrays)
```

-   **chunck(xs: array, limit: int)**: `chunk([1, 2, 3, 4, 5], 2)` resultado `[[1, 2], [3, 4], 5]`.
-   **flatmap**: Função de `flatmap` para versões Node.js sem esta implementação nativa.
-   **asyncFilter**: Função de `filter` para cenários assíncronos, portanto retorna uma _Promise_.
-   **arrayToBase64(xs: array)**: Função que recebe um _Array_ e retorna um _Base64_ equivalente, senão dispara o erro.
-   **arrayToJson(base64: string)**: Função que recebe um _Base64_ e retorna um _Object_ equivalente, senão dispara o erro.
-   **collect**: [collect.js](https://collect.js.org/)

### Object Utilities

```javascript
const {
    merge,
    json,
    inspect,
    isConfig,
    toJson,
    toBase64,
    toError,
    toErrorStack,
    joi,
} = require('i-node-utils/app/objects')
```

-   **joi**: [joi.js](https://github.com/hapijs/joi#readme)
-   **merge**: Atalho p/ `const merge = (obj, toMerge) => Object.assign(obj, toMerge)`.
-   **json**: Atalho p/ `const json = obj => JSON.stringify(obj)`.
-   **inspect**: Atalho p/ `const inspect = obj => util.inspect(obj, false, null)`.
-   **toJson(base64: string)**: Função que recebe um _Base64_ e retorna o _Json_ equivalente, senão dispara o erro.
-   **toBase64(json: string)**: Função que recebe um _Object_ e retorna o _Base64_ equivalente, senão dispara o erro.
-   **toErrorStack**: Função que retorna um _Error_ detalhado, com `code` e `type`. Exemplo:

```javascript
const stackError = toErrorStack(new Error('Message'))
console.log(stackError.code) // 500
console.log(stackError.type) // error
console.log(stackError.message) // Message

const stackError = toErrorStack(null)
console.log(stackError.code) // 520
console.log(stackError.type) // unknown_error
console.log(stackError.message) // null
```

Esta função também trata erros que são _Object_'s que possuem uma estrutura de erro _HTTP_, e.g. `error.request` ou `error.response`.

-   **toErrorTrace**: Função que retorna uma _Promise_ com o error detalhado, com trace completo em formato json. Exemplo:

```javascript
toErrorTrace(e)
    .then(hydrateError => console.error(hydrateError))
    .catch(console.error)
```

Essa função utiliza a biblioteca [stacktrace.js]() para recuperar o trace do erro passado como parâmetro, caso ocorra um erro durante o processo de recuperar o erro detalhado usando o _stacktracejs_ será retornado o erro original em `.catch(e => console.error(e))`.

-   **isConfig(obj)**: Função que retorna `true` se o _Object_ passado repeitar o contrato básico _like a convict_ ou _node_config_, esta função é útil caso tenhamos uma biblioteca que utiliza configurações externas e as recebe através de uma _Object_ e pode validar se este parâmetro passado respeita métodos base que recupera as configurações externas. Basicamente esta função valida o seguinte:

```javascript
interface IConfig {
   get(param: String): Object
   has(param: String): Boolean
   getProperties(): Object
}
```

Portanto,

```javascript
let isValidConfig = isConfig({
    label: 'value',
})
// isValidConfig === false

isValidConfig = isConfig({
    get: s => s,
    has: s => !!s,
    getProperties: () => {},
})
// isValidConfig === true
```
