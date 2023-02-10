const { Component, mount, xml, useState, useEnv, reactive } = owl;

class ResultText {
  result_result = "Start Your Game";
  edit_result(msg) {
    this.result_result = msg;
  }
  get_result() {
    return this.result_result;
  }
}
const get = () => {
  const this_env = useEnv();
  return useState(this_env.result);
};

const get_result_text = () => {
  return reactive(new ResultText());
};

class ResultComponent extends Component {
  static template = xml`
    <div class="result">
        <h2><t t-esc="this.new.get_result()" /></h2>
    </div>
    <div class="move">Choose your move</div>
    `;

  setup() {
    this.new = get();
  }
}

class ButtonComponent extends Component {
  static template = xml`
    <div class="options">
        <button t-on-click="() => start_game('rock')" class="rock far fa-hand-rock" ></button>
        <button t-on-click="() => start_game('paper')" class="paper far fa-hand-paper"></button>
        <button t-on-click="() => start_game('scissors')" class="scissor far fa-hand-scissors"></button>
      </div>
      `;
  start_game = (user_choice) => {
    const computer_options = ["rock", "paper", "scissors"];
    const computer_number = Math.floor(Math.random() * 3);
    const comp_choice = computer_options[computer_number];
    if (user_choice == comp_choice) {
      this.new.edit_result("It's Draw");
    } else if (
      (user_choice == "rock") & (comp_choice == "scissors") ||
      (user_choice == "paper") & (comp_choice == "rock") ||
      (user_choice == "scissors") & (comp_choice == "paper")
    ) {
      this.props.score.user_score++;
      this.new.edit_result("You Win");
    } else if (
      (user_choice == "rock") & (comp_choice == "paper") ||
      (user_choice == "paper") & (comp_choice == "scissors") ||
      (user_choice == "scissors") & (comp_choice == "rock")
    ) {
      this.props.score.computer_score++;
      this.new.edit_result("You Lose");
    }
  };
  static props = ["score"];

  setup() {
    this.new = get();
  }
}

class MainComponent extends Component {
  static template = xml`
      <section class="game">
        <div class="title">Rock Paper Scissor</div>
        <div class="score">
          <div class="playerScore">
            <h2>Player</h2>
            <p t-esc="score.user_score" ></p>
          </div>
          <div class="computerScore">
            <h2>Computer</h2>
            <p t-esc="score.computer_score" ></p>
          </div>
        </div>
        <ResultComponent/>
        <ButtonComponent score="score"/>
      </section>
      `;
  setup() {
    this.score = useState({ computer_score: 0, user_score: 0 });
  }
  static components = { ResultComponent, ButtonComponent };
}

const env = {
  result: get_result_text(),
};

mount(MainComponent, document.body, { dev: true, env });
