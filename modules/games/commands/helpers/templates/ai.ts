export default function templateAI(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}AI } from './_types';

const ${gameId}AI: ${capId}AI = {};

export default ${gameId}AI;
`;
}