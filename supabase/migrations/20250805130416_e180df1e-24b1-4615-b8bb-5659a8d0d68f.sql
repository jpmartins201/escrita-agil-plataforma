-- Adicionar coluna price_id na tabela cursos
ALTER TABLE public.cursos 
ADD COLUMN price_id TEXT;

-- Atualizar os cursos com os price_ids fornecidos
UPDATE public.cursos SET price_id = 'price_1RrQ6GR72zHVtnWFBPbxw5bn' WHERE slug = 'escrita-agil';
UPDATE public.cursos SET price_id = 'price_1RrQ2rR72zHVtnWFxqh2RCUg' WHERE slug = 'como-escrever-um-artigo-cientifico';
UPDATE public.cursos SET price_id = 'price_1RsXe1R72zHVtnWFJJGXaTqS' WHERE slug = 'metodologia-de-pesquisa-avancada';
UPDATE public.cursos SET price_id = 'price_1RsXj8R72zHVtnWFvhEbaprD' WHERE slug = 'metodologia-de-pesquisa';
UPDATE public.cursos SET price_id = 'price_1RsXjWR72zHVtnWFOAMTjdvv' WHERE slug = 'publicacao-cientifica-internacional';