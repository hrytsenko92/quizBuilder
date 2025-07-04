Bash
docker-compose up

structure:
.
├── backend
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20250704151154_init
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── src
│   │   ├── controllers
│   │   │   └── quiz.controller.ts
│   │   ├── index.ts
│   │   ├── prisma.ts
│   │   └── routes
│   │       └── quiz.routes.ts
│   └── tsconfig.json
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── app
│   │   │   ├── (quiz)
│   │   │   │   ├── create
│   │   │   │   │   └── page.tsx
│   │   │   │   └── quizzes
│   │   │   │       ├── [id]
│   │   │   │       ├── page.tsx
│   │   │   │       └── quizzesPage.module.css
│   │   │   ├── globals.css
│   │   │   ├── layout.module.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.module.css
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── questionInput
│   │   │   │   ├── index.tsx
│   │   │   │   └── questionInput.module.css
│   │   │   ├── quizCard
│   │   │   │   ├── index.tsx
│   │   │   │   └── quizCard.module.css
│   │   │   └── quizForm
│   │   │       ├── index.tsx
│   │   │       └── quizForm.module.css
│   │   ├── services
│   │   │   └── quiz.service.ts
│   │   ├── types
│   │   │   └── quiz.ts
│   │   └── utils
│   │       └── validation.ts
│   └── tsconfig.json
└── README.md