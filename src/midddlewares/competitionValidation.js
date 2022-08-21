const playerValidateName = (req, res, next) => {
    const { atleta } = req.body;
    const messageRequired = { message: 'O campo "atleta" é obrigatório' }; 
    if (!atleta || atleta === '') return res.status(400).json(messageRequired);

    if (atleta.length < 3) {
        return res.status(400)
            .json({ message: 'O nome do atleta deve ter pelo menos 3 caracteres' });
    }
    next();
};

const playerValidateValue = (req, res, next) => {
    const { value } = req.body;
    if (!value) return res.status(400).json({ message: 'O campo "value" é obrigatório' });
    if (Number(value) <= 1) {
        return res.status(400).json({
            message: 'O valor alcançado deve ser maior que 1',
        });
    }
    next();
};

const playerValidateUnit = (req, res, next) => {
    const { unidade } = req.body;
    const messageRequired = { message: 'O campo "unidade" é obrigatório' }; 
    if (!unidade || unidade === '') return res.status(400).json(messageRequired);

    next();
};

module.exports = {
    playerValidateValue,
    playerValidateName,
    playerValidateUnit,
};