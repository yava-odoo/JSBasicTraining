const { Component, mount, xml } = owl;
let computer_score = 0;
let player_score = 0;

class ResultComponent extends Component {
  static template = xml`
    <div class="result">
        <h2 id="result_text">hello</h2>
    </div>
    <div class="move">Choose your move</div>
    `;
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
      result_text.textContent = "It's Draw";
    } else if (
      (user_choice == "rock") & (comp_choice == "scissors") ||
      (user_choice == "paper") & (comp_choice == "rock") ||
      (user_choice == "scissors") & (comp_choice == "paper")
    ) {
      player_score++;
      p_count.innerText = player_score;
      result_text.textContent = "You Win";
    } else if (
      (user_choice == "rock") & (comp_choice == "paper") ||
      (user_choice == "paper") & (comp_choice == "scissors") ||
      (user_choice == "scissors") & (comp_choice == "rock")
    ) {
      computer_score++;
      c_count.innerText = computer_score;
      result_text.textContent = "You Lose";
    }
  };
}

class MainComponent extends Component {
  static template = xml`
      <section class="game">
        <div class="title">Rock Paper Scissor</div>
        <div class="score">
          <div class="playerScore">
            <h2>Player</h2>
            <p id="p_count">0</p>
          </div>
          <div class="computerScore">
            <h2>Computer</h2>
            <p id="c_count">0</p>
          </div>
        </div>
        <ResultComponent/>
        <ButtonComponent/>
      </section>
      `;
  static components = { ResultComponent, ButtonComponent };
}

mount(MainComponent, document.body);
