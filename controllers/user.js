const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* register users. */
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Utilisateur déjà existant.' });
        }

        // Hash le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({
            message: 'Utilisateur enregistré avec succès.',
            user: {
                username: newUser.username,
                email: newUser.email,
                id: newUser._id
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.', error });
    }
};

// login user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trouver l'utilisateur dans MongoDB
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        })
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur ou mot de passe incorrect.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Utilisateur ou mot de passe incorrect.' });
        }

        // Créer un token JWT
        const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion.', error });
    }
};

//get one user
exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
}

//update user
exports.updateUser = (req, res, next) => {
    User.updateOne({ _id: req.params }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

//delete user
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(204).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}