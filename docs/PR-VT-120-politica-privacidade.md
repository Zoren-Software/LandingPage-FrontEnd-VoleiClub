### Jira

[VT-120](https://zorensoftware.atlassian.net/browse/VT-120)

### O que?

Implementação da **política de privacidade canônica** no site público do VolleyTrack (`volleytrack.com`) e melhorias de navegação relacionadas.

- Nova página **`/privacy-policy`** com texto em português, linguagem clara (não jurídica excessiva), cobrindo: dados coletados, finalidades, bases legais (LGPD), armazenamento/AWS, compartilhamento, retenção, direitos do titular, contato e data de atualização (**Maio de 2026**).
- Apresentação legível: listas com marcadores (`•`), itens com inicial maiúscula, layout responsivo alinhado ao visual da landing.
- Link **Política de Privacidade** no menu (navbar desktop, sidebar mobile) e no footer (links úteis).
- Entrada **`https://volleytrack.com/privacy-policy`** no `public/sitemap.xml`.
- Tradução do **rótulo** do link em todos os locales (`footer_privacy_policy`); conteúdo da política permanece em **pt-BR** nesta entrega.
- Correção do link **Sobre**: removido `/sobre` (rota inexistente); passa a rolar até a seção “Sobre o VolleyTrack” na home (`#about-section`), inclusive ao acessar a partir de `/faq` ou `/privacy-policy`.
- `id="about-section"` adicionado na seção correspondente em `pages/index.vue`.

> O app SaaS (`VoleiClub-Front`) consome esta URL via link externo — escopo documentado na PR irmã desse repositório.

### Por quê?

- Primeira etapa de **conformidade LGPD**: transparência mínima sobre tratamento de dados antes e durante o cadastro.
- A landing é o ponto natural do documento legal: site público, footer com dados da empresa (CNPJ), SEO e sitemap no domínio apex — sem exigir login.
- Evitar duplicar o texto da política em cada subdomínio do app multi-tenant.
- Corrigir UX quebrada do **Sobre** e facilitar descoberta da política no menu e no rodapé.

### Como?

**Rota e layout**

- `pages/privacy-policy/index.vue` usa o layout `default` (navbar + footer existentes).
- `useHead({ title: 'Política de Privacidade' })` integra ao `titleTemplate` do Nuxt.
- Rota já é pública — **sem alteração** em `middleware/auth.global.ts`.

**Navegação “Sobre”**

- Função `routeAbout` em `layouts/default.vue`, no mesmo padrão de `routePlans`, `routeFAQ` e `routeBenefits`:
  - Se `pathname !== '/'`, navega para `/` e após timeout faz `scrollIntoView` em `.about-section`.
  - Na home, scroll direto.
- Navbar, sidebar e footer usam `href="#about-section"` + `@click.prevent="routeAbout"`.

**Listas na política**

- Classe `privacy-list` com marcador via `li::before` (`•` em `#ff7300`), pois estilos globais do Vuestic ocultavam `list-style` nativo.

**i18n**

- Nova chave `footer_privacy_policy` em `locales/pt-br.json`, `en.json`, `es.json`, `fr.json`, `it.json`, `pl.json`, `ru.json`.

**Arquivos**

| Ação | Arquivo |
|------|---------|
| Criado | `pages/privacy-policy/index.vue` |
| Criado | `docs/PR-VT-120-politica-privacidade.md` |
| Alterado | `layouts/default.vue` |
| Alterado | `pages/index.vue` |
| Alterado | `public/sitemap.xml` |
| Alterado | `locales/*.json` (7 idiomas) |

### Capturas de tela

_Adicionar antes do merge:_

1. `/privacy-policy` — visão geral (desktop).
2. `/privacy-policy` — mobile (listas e hierarquia de títulos).
3. Navbar com **Política de Privacidade** e **Sobre**.
4. Footer — links úteis (privacidade + sobre).
5. Fluxo **Sobre** a partir de `/privacy-policy` ou `/faq` → home com scroll na seção “Sobre o VolleyTrack”.

### Verificações

- [ ] `/privacy-policy` carrega sem autenticação.
- [ ] Conteúdo completo das seções + `support@volleytrack.com` + “Última atualização: Maio de 2026”.
- [ ] Marcadores das listas visíveis; itens com inicial maiúscula.
- [ ] Link no navbar, sidebar mobile e footer funcionando.
- [ ] `sitemap.xml` inclui `https://volleytrack.com/privacy-policy`.
- [ ] **Sobre** não aponta mais para `/sobre`; scroll na home funciona a partir de outras rotas.
- [ ] Rótulo do link traduz ao trocar idioma (conteúdo da página segue em pt-BR).
- [ ] Lembrete: Ajustar o `composer.json` com a versão — **N/A** (projeto Nuxt/frontend; sem backend PHP neste repositório).

### Test plan rápido

```bash
cd LandingPage-FrontEnd-VoleiClub
pnpm dev
# http://localhost:3001/privacy-policy
```
