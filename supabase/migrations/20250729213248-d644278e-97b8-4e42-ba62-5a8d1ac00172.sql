-- Consolidar tabelas cursos e curso_precos
-- Adicionar colunas de preço e ordem à tabela cursos
ALTER TABLE public.cursos 
ADD COLUMN preco NUMERIC,
ADD COLUMN moeda TEXT DEFAULT 'BRL',
ADD COLUMN tipo_preco TEXT DEFAULT 'unico',
ADD COLUMN ordem_exibicao INTEGER DEFAULT 0;

-- Migrar dados da tabela curso_precos para cursos
UPDATE public.cursos 
SET 
  preco = cp.preco,
  moeda = cp.moeda,
  tipo_preco = cp.tipo_preco
FROM public.curso_precos cp 
WHERE cursos.slug = cp.curso_slug;

-- Adicionar valores padrão para cursos sem preço
UPDATE public.cursos 
SET preco = 0 
WHERE preco IS NULL;

-- Adicionar índice para performance na ordenação
CREATE INDEX idx_cursos_ordem_exibicao ON public.cursos(ordem_exibicao);

-- Remover tabela curso_precos após migração
DROP TABLE public.curso_precos;