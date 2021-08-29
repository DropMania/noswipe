const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
admin.initializeApp()

exports.getMatchData = functions.https.onRequest((request, response) => {
    cors(
        (request,
        response,
        async () => {
            let data = request.body.data
            let user = await admin
                .firestore()
                .collection('users')
                .doc(data.userId)
                .get()
            response.json(user.data())
        })
    )
})
