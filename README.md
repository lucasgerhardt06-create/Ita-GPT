# ITA-GPT 🇮🇹

ITA-GPT est une application web pour apprendre l'italien avec l'aide de l'Intelligence Artificielle (Google Gemini).

## Caractéristiques

- **Design Dark Neon**: Thème sombre premium inspiré de l'Italie nocturne
- **Tuteur IA (Gemini)**: Un professeur virtuel qui répond toujours en italien
- **Multilingue**: Posez des questions dans n'importe quelle langue
- **Technologies**: Next.js 14, Tailwind CSS v4, Framer Motion, Google Generative AI

---

## 📦 PARTIE 1 : Utiliser l'application sur VOTRE ordinateur

### ✅ Étape 1 : Vérifier que vous avez Node.js

1. Ouvrez le **Terminal** (sur Mac) ou **Invite de commandes** (sur Windows)
   - **Mac** : Appuyez sur `Cmd + Espace`, tapez "Terminal", appuyez sur Entrée
   - **Windows** : Appuyez sur `Windows + R`, tapez "cmd", appuyez sur Entrée

2. Dans le terminal, tapez exactement ceci et appuyez sur Entrée :
   ```bash
   node -v
   ```

3. **Si vous voyez un numéro** (exemple : `v25.2.1`) → **Parfait ! Passez à l'Étape 2**
   
   **Si vous voyez "command not found"** ou une erreur → Vous devez installer Node.js :
   - Allez sur [nodejs.org](https://nodejs.org)
   - Téléchargez la version **LTS** (le gros bouton vert)
   - Installez-la (suivez les instructions, cliquez sur "Suivant" partout)
   - **Fermez et rouvrez** le Terminal
   - Retapez `node -v` pour vérifier

### ✅ Étape 2 : Ouvrir le dossier du projet dans le Terminal

Vous avez déjà le dossier `ItaGPT` quelque part sur votre ordinateur. Il faut dire au Terminal d'aller dans ce dossier.

**Méthode facile (Mac)** :
1. Ouvrez le Finder
2. Trouvez le dossier `ItaGPT` (probablement dans `Documents`)
3. Faites un clic droit sur le dossier `ItaGPT`
4. Maintenez la touche `Option` enfoncée
5. Cliquez sur **"Copier ItaGPT en tant que chemin d'accès"**
6. Dans le Terminal, tapez `cd ` (avec un espace après)
7. Collez le chemin (Cmd + V)
8. Appuyez sur Entrée

**Méthode facile (Windows)** :
1. Ouvrez l'Explorateur de fichiers
2. Trouvez le dossier `ItaGPT`
3. Cliquez dans la barre d'adresse en haut (où il y a le chemin)
4. Copiez le chemin (Ctrl + C)
5. Dans l'Invite de commandes, tapez `cd ` (avec un espace après)
6. Collez le chemin (Clic droit → Coller)
7. Appuyez sur Entrée

**Méthode universelle** :
```bash
cd /Users/axel/Documents/ItaGPT
```
(Remplacez par le vrai chemin de votre dossier)

### ✅ Étape 3 : Installer les dépendances

Dans le Terminal (qui est maintenant dans le dossier ItaGPT), tapez :
```bash
npm install
```

Appuyez sur Entrée. Vous allez voir plein de lignes défiler. **C'est normal !** Attendez 1-2 minutes.

Quand c'est fini, vous revenez à une ligne qui attend votre commande.

### ✅ Étape 4 : Obtenir une clé API Google Gemini (GRATUIT)

1. Ouvrez votre navigateur
2. Allez sur [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
3. Connectez-vous avec votre compte Google (Gmail)
4. Cliquez sur le bouton bleu **"Create API Key"** (Créer une clé API)
5. Une fenêtre s'ouvre avec votre clé (elle commence par `AIzaSy...`)
6. Cliquez sur l'icône de copie (📋) à côté de la clé
7. **Gardez cette page ouverte**, vous en aurez besoin dans 2 minutes

### ✅ Étape 5 : Créer le fichier de configuration

1. Ouvrez le dossier `ItaGPT` dans votre explorateur de fichiers (Finder sur Mac, Explorateur sur Windows)

2. **Créez un nouveau fichier texte** :
   - **Mac** : Ouvrez TextEdit → Format → Convertir au format texte
   - **Windows** : Ouvrez le Bloc-notes

3. Dans ce fichier vide, écrivez **exactement** ceci :
   ```
   GEMINI_API_KEY=
   ```

4. **Juste après le `=`**, collez votre clé API (celle que vous avez copiée à l'Étape 4)
   
   Ça doit ressembler à ça :
   ```
   GEMINI_API_KEY=AIzaSyDh3K...votre-vraie-clé...
   ```
   (Une seule ligne, pas d'espace avant ou après)

5. **Enregistrez ce fichier** :
   - **Nom du fichier** : `.env.local` (avec le point au début !)
   - **Emplacement** : Dans le dossier `ItaGPT` (à côté de `package.json`)
   - **Important** : Enlevez l'extension `.txt` si elle apparaît

6. **Vérification** : Dans le dossier `ItaGPT`, vous devez maintenant voir un fichier nommé `.env.local`

### ✅ Étape 6 : Lancer l'application

1. Retournez dans le Terminal (qui doit toujours être dans le dossier ItaGPT)

2. Tapez exactement :
   ```bash
   npm run dev
   ```

3. Appuyez sur Entrée

4. Attendez 5-10 secondes. Vous allez voir des messages, puis :
   ```
   ▲ Next.js 16.0.5
   - Local:        http://localhost:3000
   ```

5. **Ouvrez votre navigateur** (Chrome, Safari, Firefox, etc.)

6. Dans la barre d'adresse, tapez :
   ```
   localhost:3000
   ```

7. Appuyez sur Entrée

🎉 **BRAVO !** Vous devriez voir ITA-GPT s'afficher !

### � Pour arrêter l'application

Dans le Terminal, appuyez sur `Ctrl + C` (même sur Mac, c'est bien Ctrl, pas Cmd)

---

## 🚀 PARTIE 2 : Mettre l'application en ligne (Vercel)

**Pourquoi faire ça ?**  
Pour utiliser ITA-GPT depuis votre téléphone, votre tablette, ou n'importe où, **sans laisser votre ordinateur allumé**.

### ✅ Étape 1 : Installer Git

Même si vous n'avez pas Git, vous en aurez besoin pour mettre le code en ligne.

1. Allez sur [git-scm.com/downloads](https://git-scm.com/downloads)
2. Téléchargez Git pour votre système (Mac ou Windows)
3. Installez-le (cliquez sur "Suivant" partout, gardez les options par défaut)
4. **Fermez et rouvrez** le Terminal
5. Vérifiez que c'est installé :
   ```bash
   git --version
   ```
   (Vous devez voir un numéro de version)

### ✅ Étape 2 : Créer un compte GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"Sign up"** (en haut à droite)
3. Entrez votre email, créez un mot de passe, choisissez un nom d'utilisateur
4. Validez votre email (GitHub vous envoie un code)
5. Une fois connecté, vous arrivez sur votre page d'accueil GitHub

### ✅ Étape 3 : Créer un repository (dépôt) sur GitHub

1. Sur GitHub, cliquez sur le **+** en haut à droite
2. Cliquez sur **"New repository"**
3. Remplissez :
   - **Repository name** : `ita-gpt` (ou le nom que vous voulez)
   - Laissez **Public** coché
   - **NE COCHEZ PAS** "Add a README file"
4. Cliquez sur **"Create repository"**
5. **Gardez cette page ouverte**, vous allez copier des commandes

### ✅ Étape 4 : Envoyer votre code sur GitHub

1. Retournez dans le Terminal (dans le dossier ItaGPT)

2. Tapez ces commandes **une par une** (appuyez sur Entrée après chaque ligne) :

   ```bash
   git init
   ```
   (Initialise Git dans votre dossier)

   ```bash
   git add .
   ```
   (Ajoute tous les fichiers)

   ```bash
   git commit -m "Premier commit"
   ```
   (Enregistre les fichiers)

   ```bash
   git branch -M main
   ```
   (Renomme la branche principale)

3. **Maintenant**, retournez sur la page GitHub que vous avez gardée ouverte

4. Vous devriez voir une section **"…or push an existing repository from the command line"**

5. Copiez la **première ligne** (elle ressemble à ça) :
   ```bash
   git remote add origin https://github.com/VOTRE-NOM/ita-gpt.git
   ```

6. Collez-la dans le Terminal et appuyez sur Entrée

7. Ensuite, tapez :
   ```bash
   git push -u origin main
   ```

8. **Si on vous demande de vous connecter** :
   - Entrez votre nom d'utilisateur GitHub
   - Pour le mot de passe, **utilisez un Personal Access Token** (pas votre mot de passe normal)
   - Pour créer un token : GitHub → Settings → Developer settings → Personal access tokens → Generate new token

9. Attendez quelques secondes. Votre code est maintenant sur GitHub !

### ✅ Étape 5 : Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub

### ✅ Étape 6 : Déployer votre projet

1. Sur Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Vous voyez la liste de vos repositories GitHub
3. Trouvez `ita-gpt` et cliquez sur **"Import"**
4. **AVANT de cliquer sur Deploy**, faites défiler jusqu'à **"Environment Variables"**
5. Cliquez sur **"Add"** (Ajouter)
6. Remplissez :
   - **Name** : `GEMINI_API_KEY`
   - **Value** : Collez votre clé API (celle qui commence par `AIzaSy...`)
7. Cliquez sur **"Add"**
8. Maintenant, cliquez sur **"Deploy"**

9. Attendez 1-2 minutes (une barre de progression s'affiche)

10. Quand c'est fini, vous voyez 🎉 **Congratulations!**

11. Cliquez sur le lien (par exemple `ita-gpt.vercel.app`)

🎉 **FÉLICITATIONS !** Votre application est en ligne ! Vous pouvez ouvrir ce lien depuis n'importe quel appareil.

---

## ❓ Problèmes fréquents

### "npm: command not found"
→ Node.js n'est pas installé. Retournez à l'Étape 1.

### "git: command not found"
→ Git n'est pas installé. Installez-le depuis [git-scm.com](https://git-scm.com).

### Le fichier `.env.local` n'apparaît pas
→ Sur Mac, appuyez sur `Cmd + Shift + .` dans le Finder pour voir les fichiers cachés.

### L'IA ne répond pas
→ Vérifiez que votre clé API est bien dans `.env.local` et qu'elle est valide sur [Google AI Studio](https://aistudio.google.com/app/apikey).

### "Port 3000 is already in use"
→ Utilisez un autre port :
```bash
npm run dev -- -p 3001
```
(Puis allez sur `localhost:3001`)

---

## 📝 Crédits

Développé avec ❤️ pour l'apprentissage de l'italien.  
Propulsé par Google Gemini.
