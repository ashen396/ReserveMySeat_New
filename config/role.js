const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
});

const PERMISSIONS = Object.freeze({
    BUS: {
        GET_ALL: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        GET_ID: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        INSERT: [ROLES.ADMIN],
        UPDATE: [ROLES.ADMIN],
        DELETE: [ROLES.ADMIN]
    },
    BOOKING: {
        GET_ID: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        INSERT: [ROLES.USER, ROLES.USER, ROLES.GUEST],
    },
    DRIVER: {
        GET_ALL: [ROLES.ADMIN],
        GET_ID: [ROLES.ADMIN],
        INSERT: [ROLES.ADMIN],
        UPDATE: [ROLES.ADMIN],
        DELETE: [ROLES.ADMIN]
    },
    ROUTE: {
        GET_ALL: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        GET_ID: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        INSERT: [ROLES.ADMIN],
        UPDATE: [ROLES.ADMIN],
        DELETE: [ROLES.ADMIN]
    },
    SCHEDULE: {
        GET_ALL: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        GET_ID: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        INSERT: [ROLES.ADMIN],
        UPDATE: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
        DELETE: [ROLES.ADMIN]
    },
    USER: {
        GET_ID: [ROLES.ADMIN],
    }
})

module.exports = { ROLES, PERMISSIONS };