```ts
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
	proxy: {
		'/api': 'http://localhost:ditt-portnummer/'
	}
  }
})
```

Detta är filen `/frontend/vite.config.ts` som används för att ställa in proxy. Utan proxy kommer alla `fetch` request att fångas av utvecklingsservern och svara med `index.html`.

Lägg till sektionen server, proxy och koppla URL:er som börjar med `/api` till din backends portnummer.

