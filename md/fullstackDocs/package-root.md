```json
{
  "name": "my-project",
  "private": true,
  "scripts": {
        "dev:frontend": "npm run dev --workspace=frontend",
        "restart:backend": "npm run restart --workspace=backend",
        "build": "npm run build --workspaces"
  },
  "author": "",
  "type": "module",
  "workspaces": ["frontend", "backend", "packages/shared"]
}
```

Denna fil är `/package.json`.

+ Fältet `name` ska vara projektets namn.

+ private:true förhindrar att projektet publiceras på npm av misstag. När man arbetar med monorepo och workspaces vill man oftast inte publicera rot-paketet, utan snarare de enskilda paketen inuti.

+ `workspaces` talar om vilka ingående paket som ska kunna användas

+ i `scripts` lägger du till alla skript du behöver för att kunna bygga och köra projektet. Flaggan `--workspace=x` kör kommandot inuti motsvarande workspace.

+ `type: module` talar om att vi vill använda modern JavaScript, ESM i stället för CommonJS.

