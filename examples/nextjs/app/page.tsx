"use client";
import Image from "next/image";

import useAdvancedTypingAnimation from "../app/hooks/useAdvancedTypingAnimation"




export default function Page(): JSX.Element {
  const [ref] = useAdvancedTypingAnimation<HTMLDivElement>(`
    <writing infinity="true">
        <cursor />
        <typewriter speed="10" mode="0">
          There was once a boy who loved to play tricks. The people of the village grew so tired of his antics they sent him to guard the sheep. ‘Go on, up the hill by yourself and think about the misery you’ve caused us.’
It was so boring up there, away from everything. Ah! He had an idea. He cupped his hands to his mouth. ‘Wolf! Wolf!’ The people came running. The boy sniggered.
A few days later: ‘Wolf! Wolf!’ Again the people came. How the boy laughed! When they had gone, he thought, ‘I’ll leave it a while before I try that trick again.’
The very next day, out of the forest, his jaws dripping, slunk a wolf. ‘Wolf! Wolf!’ cried the boy. ‘Wolf!’
Down in the village the people looked at one another, shook their heads and said, ‘He must think we’re idiots.’ At the end of the day, when he did not return, they went in search of him. They found neither boy nor sheep - just wool and blood and bones.
        </typewriter>
        <typewriter speed="10" mode="0">
          Once upon a time, a cat fell hopelessly in love with her master. He was a very handsome young man and she longed to marry him. The cat prayed to Aphrodite, the goddess of love: ‘Oh mighty Goddess, please change me into a woman.’
The goddess heard the cat’s prayer and granted her wish. Straightway, she became a beautiful young woman with green eyes and long, thick tabby hair. The young man fell hopelessly in love with her and soon there was a wedding. The goddess looked down at them and smiled to herself. ‘I wonder,’ she thought, ‘how much of her is cat and how much of her is woman.’
On the morning after the wedding night, Aphrodite reached into their bed-chamber and dropped a mouse onto the floor. It darted past the bed. The woman saw it out of the corner of her eye. She jumped out of the bed, ran across the room, seized the mouse in her mouth, gave it a shake and then climbed back into bed. Her husband looked at her, wide-eyed with astonishment.
        </typewriter>
    </writing>
  `)

  const [ref2] = useAdvancedTypingAnimation<HTMLDivElement>(`
    <writing infinity="true">
        <cursor />
        <typewriter speed="10" mode="1">
          Once upon a time, a cat fell hopelessly in love with her master. He was a very handsome young man and she longed to marry him. The cat prayed to Aphrodite, the goddess of love: ‘Oh mighty Goddess, please change me into a woman.’
The goddess heard the cat’s prayer and granted her wish. Straightway, she became a beautiful young woman with green eyes and long, thick tabby hair. The young man fell hopelessly in love with her and soon there was a wedding. The goddess looked down at them and smiled to herself. ‘I wonder,’ she thought, ‘how much of her is cat and how much of her is woman.’
On the morning after the wedding night, Aphrodite reached into their bed-chamber and dropped a mouse onto the floor. It darted past the bed. The woman saw it out of the corner of her eye. She jumped out of the bed, ran across the room, seized the mouse in her mouth, gave it a shake and then climbed back into bed. Her husband looked at her, wide-eyed with astonishment.
        </typewriter>
    </writing>
  `)


  const [ref3] = useAdvancedTypingAnimation<HTMLDivElement>(`
    <writing>
        <mask duration='20' color='linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)' mode="1">
         Once upon a time the arms and the legs became angry with the belly. ‘It’s not fair. We do all the work – walking, lifting, carrying, climbing, making, shaping – and the belly does nothing. He just sits there. And he gets rewarded with all the food and drink. And what do we get? Nothing! We’re no better than slaves. And to make things worse, it’s us who give the belly his nourishment, tramping the fields, lifting the food to his mouth. And do we get any thanks for our trouble? Not a word. It’s time we taught the belly a lesson: let’s go on strike. From now on he can look after himself.’
And so the arms and the legs left the belly to starve. The legs wouldn’t walk out to fetch food. The arms wouldn’t lift and carry. And after a few days the arms felt themselves growing weaker and weaker. The legs trembled and couldn’t stand any longer. With an empty belly, the body began to fail. Too late, they understood that it is the belly that gives them the strength they need.
        </mask>
    </writing>
  `)

  return (
    <div className="flex">
      <div className="w-1/3">
        <h5 className="font-bold">The Boy who Cried 'Wolf'!</h5>
        <div className="p-1 text-2xl" ref={ref} />
      </div>
      <div className="w-1/3 ">
        <h5 className="font-bold">Catwoman</h5>
        <div className="p-1 text-2xl" ref={ref2} />
      </div>
      <div className="w-1/3">
        <h5 className="font-bold">The Divided Body</h5>
        <div className="p-1 text-2xl" ref={ref3} />
      </div>
    </div>
  )
}
