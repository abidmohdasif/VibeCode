# Deployment Document
**Project Title:** Dream Glitch: Escape the AI Simulation
**Version:** Abid Asif
**Last Updated:** 2025-04-07
---
## Project Structure
```
dream-glitch/
 index.html # Main game file
 assets/ # Images, fonts, audio, etc.
 ...
 css/ # Optional: External stylesheets
 style.css
 js/ # Optional: External scripts
 game.js
 README.md # Project description
 LICENSE # Licensing file
 .gitignore # Git ignore file (if using Git)
```
---
## Setup Instructions
### 1. **Local Development**
#### Requirements:
- A modern browser (Chrome, Firefox, Edge)
- [Live
Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
(optional for live reloading)
- Git (optional for version control)
#### Steps:
1. Clone or download the repository:
 ```bash
 git clone https://abidmohdasif.github.io/VibeCode/
 cd dream-glitch
 ```
2. Open `index.html` directly in your browser.
 Or, if using VS Code:
 - Install **Live Server**
 - Right-click `index.html` and select **"Open with Live Server"**
---
## Deployment Options
### Option 1: **GitHub Pages (Free Hosting)**
#### Steps:
1. Push your project to a GitHub repository.
2. Go to `Settings > Pages`.
3. Set the source branch to `main` and directory to `/root`.
4. Your game will be available at:
 ```
 https://abidmohdasif.github.io/VibeCode/
 ```
---
### Option 2: **Netlify (Fast & Easy)**
#### Steps:
1. Go to [Netlify](https://netlify.com).
2. Drag-and-drop your project folder onto the dashboard.
3. Alternatively, link a GitHub repository.
4. Netlify will auto-deploy and give you a custom domain.
---
### Option 3: **Vercel**
#### Steps:
1. Go to [Vercel](https://vercel.com).
2. Import your GitHub repository.
3. Click "Deploy".
4. Done!
---
## Customization
- **Game Configuration** (e.g., timer durations, logic puzzles, etc.) is managed in the
`<script>` section of `index.html`.
- To add **more levels**, update the `levelConfigs` object with new challenge sets.
- Update **styling** inside the `<style>` tag or move it into a `style.css` file for
cleaner management.
---
## Future Enhancements (Suggestions)
- Add sound effects and ambient audio
- Implement save progress via localStorage
- Mobile responsiveness tweaks
- Leaderboard or scoring history
- Backend support for multiplayer or narrative branching (using Firebase or Supabase)
---
## Testing
Test across:
- Browsers: Chrome, Firefox, Edge
- Devices: Desktop, Tablet, Mobile
Ensure:
- Game UI scales properly
- Animations and glitch effects run smoothly
- Game logic behaves as expected
---
## License
Add a `LICENSE` file to define terms of use. For open-source, [MIT
License](https://choosealicense.com/licenses/mit/) is commonly used.
---
## Support
If issues arise:
- Clear cache / hard reload the page
- Open DevTools (F12) to view any console errors
- Reach out at: amasif@my.waketech.edu