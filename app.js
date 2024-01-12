const config = {
    dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    secretLength: 4,
}

function getNewSecret() {
    const newDictionary = [...config.dictionary];
    const result = [];
    let secretLength = config.secretLength;

    while (secretLength--) {
        const j = Math.floor(Math.random() * newDictionary.length);
        result.push(newDictionary[j]);
        newDictionary.splice(j, 1);
    }

    return result;
}

function getBullsCows(secret, guess) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < guess.length; i++) {

        if (secret[i] === guess[i]) {
            bulls++;
            continue;
        }
        if (secret.includes(guess[i])) {
            cows++;
        }
    }

    return {
        bulls,
        cows
    };
}

const app = Vue.createApp({
    data() {
        return {
            isGameStarted: false,
            isGameFinished: false,
            secretLength: config.secretLength,
            secret: null,
            history: [],
            guess: null,
        };
    },
    methods: {
        startNewGame() {
            this.isGameStarted = true;
            this.isGameFinished = false;
            this.history = [];
            this.secret = getNewSecret();
        },
        finishGame() {
            this.isGameFinished = true;
            this.isGameStarted = false;
        },
        confirmGuess() {
            const result = getBullsCows(this.secret, this.guess);

            this.history.push({
                guess: this.guess,
                result: result,
            });

            this.guess = '';

            if (result.bulls === config.secretLength) {
                this.isGameFinished = true;
            }

            const input = this.$refs['guess-input'];
            if (input && input.focus) {
                input.focus();
            }
        },
    },
    computed: {
        isGuessValid() {
            if (!this.guess ||
                this.guess.length !== config.secretLength
                // check if unique chars?
            ) {
                return false;
            }

            return true;
        }
    }
});

app.mount('#app');
