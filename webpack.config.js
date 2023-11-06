const path = require('path');

module.exports = {
  // Définissez le point d'entrée de votre application.
  entry: './app/layout.tsx', // Mettez à jour le chemin en fonction de votre structure de projet.

  // Définissez le fichier de sortie.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Mettez à jour le chemin de sortie si nécessaire.
  },

  // Ajoutez des règles pour le traitement de différents types de fichiers si nécessaire.
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Utilisez le transpileur que vous préférez (par exemple, Babel).
      },
    ],
  },
};
