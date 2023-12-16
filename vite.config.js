import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
  plugins: [handlebars({
    partialDirectory: './partials',
    context:{
        testName: {
            name: "User",
            number: "42"
        },
    }
  })],
}) 