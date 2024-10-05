/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'custom': '0 0 4px rgba(0, 0, 0, 0.3)'
              }
        },
        fontFamily: {
            sans: ['Inter', 'Arial', 'Roboto'],
            moderustic: ['Moderustic']
        },
    },
    plugins: [],
}

