function updateUserEmail(req, res, pool) {
    const { email } = req.body;
    const userId = req.user.userId;

    const sql = 'UPDATE users SET email = ? WHERE id = ?';
    pool.query(sql, [email, userId], (err, result) => {
        if (err) {
            console.error('Error updating email:', err);
            res.status(500).send('Error updating email');
        } else {
            res.json({ message: 'Email updated successfully' });
        }
    });
}

function updateUserName(req, res, pool) {
    const { name } = req.body;
    const userId = req.user.userId;

    const sql = 'UPDATE users SET name = ? WHERE id = ?';
    pool.query(sql, [name, userId], (err, result) => {
        if (err) {
            console.error('Error updating name:', err);
            res.status(500).send('Error updating name');
        } else {
            res.json({ message: 'Name updated successfully' });
        }
    });
}

function updateUsername(req, res, pool) {
    const { username } = req.body;
    const userId = req.user.userId;

    const sql = 'UPDATE users SET username = ? WHERE id = ?';
    pool.query(sql, [username, userId], (err, result) => {
        if (err) {
            console.error('Error updating username:', err);
            res.status(500).send('Error updating username');
        } else {
            res.json({ message: 'Username updated successfully' });
        }
    });
}

function updateUserPassword(req, res, pool) {
    const { password } = req.body;
    const userId = req.user.userId;

    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    pool.query(sql, [password, userId], (err, result) => {
        if (err) {
            console.error('Error updating password:', err);
            res.status(500).send('Error updating password');
        } else {
            res.json({ message: 'Password updated successfully' });
        }
    });
}

function updateBrandStatus(req, res, pool) {
    const { status } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE brand SET status = ? WHERE id = ?';
    pool.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating brand status:', err);
            res.status(500).send('Error updating brand status');
        } else {
            res.json({ message: 'Brand status updated successfully' });
        }
    });
}

function updateCategoryStatus(req, res, pool) {
    const { status } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE category SET status = ? WHERE id = ?';
    pool.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating category status:', err);
            res.status(500).send('Error updating category status');
        } else {
            res.json({ message: 'Category status updated successfully' });
        }
    });
}

function updateModelStatus(req, res, pool) {
    const { status } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE model SET status = ? WHERE id = ?';
    pool.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating model status:', err);
            res.status(500).send('Error updating model status');
        } else {
            res.json({ message: 'Model status updated successfully' });
        }
    });
}

function createBrand(req, res, pool) {
    const { name } = req.body;

    const sql = 'INSERT INTO brand (name) VALUES (?)';
    pool.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error creating brand:', err);
            res.status(500).send('Error creating brand');
        } else {
            res.json({ message: 'Brand created successfully', brandId: result.insertId });
        }
    });
}

function getBrands(req, res, pool) {
    const sql = 'SELECT * FROM brand';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving brands:', err);
            res.status(500).send('Error retrieving brands');
        } else {
            res.json(results);
        }
    });
}

function createUser(req, res, pool) {
    const { name, username, email, password, state } = req.body;

    const sql = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
    pool.query(sql, [name, username, email, password, state], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Error creating user');
        } else {
            res.json({ message: 'User created successfully', userId: result.insertId });
        }
    });
}

function getUsers(req, res, pool) {
    const sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.status(500).send('Error retrieving users');
        } else {
            res.json(results);
        }
    });
}

function createModel(req, res, pool) {
    const { name } = req.body;

    const sql = 'INSERT INTO model (name) VALUES (?)';
    pool.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error creating model:', err);
            res.status(500).send('Error creating model');
        } else {
            res.json({ message: 'Model created successfully', userId: result.insertId });
        }
    });
}

function getModels(req, res, pool) {
    const sql = 'SELECT * FROM model';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving models:', err);
            res.status(500).send('Error retrieving models');
        } else {
            res.json(results);
        }
    });
}

function loginUser(req, res, pool, jwt) {
    const { username_email, password } = req.body;

    if (!username_email || !password) {
        return res.status(400).json({ message: "Username/email and password are required" });
    }

    const isEmail = username_email.includes('@');

    let query = '';
    if (isEmail) {
        query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    } else {
        query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    }

    pool.query(query, [username_email, password], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).send('Error retrieving user');
        }

        if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
            const updateLastLoginQuery = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?';

            pool.query(updateLastLoginQuery, [user.id], (err) => {
                if (err) {
                    console.error('Error updating last login:', err);
                }
            });

                return res.json({ message: 'Login successful', token });
            } else {
                return res.status(401).json({ message: 'Invalid username/email or password' });
            }
        });
    }

function getLastLogin(req, res, pool) {
    const userId = req.user.userId;

    const sql = 'SELECT last_login FROM users WHERE id = ?';
    pool.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving last login:', err);
            return res.status(500).send('Error retrieving last login');
        }

        if (results.length > 0) {
            const lastLogin = results[0].last_login;
            return res.json({ last_login: lastLogin });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
}

function createCategory(req, res, pool) {
    const { name } = req.body;

    const sql = 'INSERT INTO category (name) VALUES (?)';
    pool.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error creating category:', err);
            res.status(500).send('Error creating category');
        } else {
            res.json({ message: 'Category created successfully', userId: result.insertId });
        }
    });
}

function getCategories(req, res, pool) {
    const sql = 'SELECT * FROM category';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving categories:', err);
            res.status(500).send('Error retrieving categories');
        } else {
            res.json(results);
        }
    });
}

function createEcr(req, res, pool) {
    const { device_id, energy_comsumption, timestamp } = req.body;

    const sql = 'INSERT INTO ecr (device_id, energy_comsumption, timestamp) VALUES (?, ?, ?)';
    pool.query(sql, [device_id, energy_comsumption, timestamp], (err, result) => {
        if (err) {
            console.error('Error creating ecr:', err);
            res.status(500).send('Error creating ecr');
        } else {
            res.json({ message: 'Ecr created successfully', userId: result.insertId });
        }
    });
}

function getEcr(req, res, pool) {
    const sql = 'SELECT * FROM ecr';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving ecr:', err);
            res.status(500).send('Error retrieving ecr');
        } else {
            res.json(results);
        }
    });
}

function createDevice(req, res, pool) {
    const { name, location, serial_number, category_id, brand_id, model_id } = req.body;
    const user_id = req.user.userId;

    if (!name || !location || !serial_number || !category_id || !brand_id || !model_id) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO devices (user_id, name, location, serial_number, category_id, brand_id, model_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    pool.query(sql, [user_id, name, location, serial_number, category_id, brand_id, model_id], (err, result) => {
        if (err) {
            console.error('Error creating device:', err);
            res.status(500).send('Error creating device');
        } else {
            res.json({ message: 'Device created successfully', deviceId: result.insertId });
        }
    });
}

function getDevices(req, res, pool) {
    const sql = 'SELECT * FROM devices';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving devices:', err);
            res.status(500).send('Error retrieving devices');
        } else {
            res.json(results);
        }
    });
}
function getUserbyID(req, res, pool) {
    const userId = req.params.id;

    if (parseInt(userId, 10) !== req.user.userId) {
        return res.status(403).json({ message: 'Access forbidden: You can only access your own data' });
    }

    const sql = 'SELECT id, name, username, email, last_login FROM users WHERE id = ?';
    pool.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.status(500).send('Error retrieving user');
        } else {
            if (results.length > 0) {
                const user = results[0];
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    });
}




module.exports = {
    updateUserEmail,
    updateUserName,
    updateUsername,
    updateUserPassword,
    updateBrandStatus,
    updateCategoryStatus,
    updateModelStatus,
    createBrand,
    getBrands,
    createUser,
    getUsers,
    createModel,
    getModels,
    loginUser,
    getLastLogin,
    createCategory,
    getCategories,
    createEcr,
    getEcr,
    createDevice,
    getDevices,
    getUserbyID,
};

