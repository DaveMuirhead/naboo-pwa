export default function ({ store, redirect }) {
    console.log("authenticated middlware running - auth is now:");
    console.log(JSON.parse(JSON.stringify(store.state.auth)));
    if (store.state.auth.loggedIn) {
        console.log("authenticated middleware redirecting to desktop")
        return redirect('/desktop')
    }
}
