import './style.css'
import { createTextEffect } from './lib/index.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="container"></p>
    <p class="container2"></p>
  </div>
`

createTextEffect(document.querySelector<HTMLDivElement>('.container')!).render(`
<effects>
  习近平指出:
  <delay duration='1000' />
  <typing duration='15000' className='highlight'>历史经验告诉我们，经济全球化或许遭遇逆风，但历史大势不会改变，“脱钩断链”没有出路，开放合作是唯一选择。荷兰是世界重要经济体，也是国际自由贸易的“风向标”。我们愿同荷方一道，推动中荷开放务实的全面合作伙伴关系不断向前发展，为世界和平、稳定、繁荣作出更大贡献。</typing>
  <delete duration='3000' count='3'/>
  <typing speed='1'>Chen</typing>
  jjj
  <mask speed='1'>
    新华社印度尼西亚巴厘岛11月15日电（记者韩梁　郑世波）当地时间11月15日下午，国家主席习近平在巴厘岛会见荷兰首相吕特。
    习近平指出，今年是中荷建立大使级外交关系50周年。两国关系面临新的发展前景。中荷关系最宝贵的经验就是开放务实。双方要继续发扬好这一特色，加强高层交往，巩固政治互信，把握好双边关系正确方向，坚持互利共赢，推进农业、水利、能源等领域合作，推动中荷开放务实的全面合作伙伴关系得到更大发展。
    习近平强调，这个世界是一体的，各国应该相互合作，而不应该寻求“脱钩”。要反对将经贸问题政治化，维护全球产业链供应链稳定。中方愿同荷方维护和践行真正的多边主义，坚持经济全球化正确方向，维护以世贸组织为核心的多边贸易体制，共同营造有利于发展的国际环境。希望荷方推动欧洲坚持开放合作，为促进中欧关系健康稳定发展发挥积极作用。
    吕特表示，很高兴在荷中建立大使级外交关系50周年这一特殊年份同习近平主席再次见面。双方举行了多项庆祝活动，中国古典文学名著《红楼梦》首次被翻译成荷兰文。荷方对习近平主席2014年对荷兰进行的成功国事访问记忆犹新，希望同中方密切交往，保持双边关系发展的强劲势头。荷方愿同中方着眼大局，挖掘潜力，拓展创新、气候变化等领域对话与合作，推动两国关系在未来50年取得更大成就。
  </mask>
</effects>
`)


createTextEffect(document.querySelector<HTMLDivElement>('.container2')!).render(`
<effects>
  Xi Jinping pointed out that 
  <delay duration='1000' />
  <typing duration='15000' className='asdf' group='words'>
    Xi Jinping pointed out that historical experience tells us that economic globalization may encounter headwinds, but the overall trend of history will not change. "Decoupling and disconnection" have no way out, and openness and cooperation are the only choices. The Netherlands is an important global economic entity and a "barometer" of international free trade. We are willing to work together with the Netherlands to continuously advance the open and pragmatic comprehensive partnership between China and the Netherlands, making greater contributions to world peace, stability, and prosperity.
  </typing>
  <delete duration='3000' count='3'/>
  <typing speed='1'>Chen</typing>
  jjj
  <mask speed='1'>
    新华社印度尼西亚巴厘岛11月15日电（记者韩梁　郑世波）当地时间11月15日下午，国家主席习近平在巴厘岛会见荷兰首相吕特。
    习近平指出，今年是中荷建立大使级外交关系50周年。两国关系面临新的发展前景。中荷关系最宝贵的经验就是开放务实。双方要继续发扬好这一特色，加强高层交往，巩固政治互信，把握好双边关系正确方向，坚持互利共赢，推进农业、水利、能源等领域合作，推动中荷开放务实的全面合作伙伴关系得到更大发展。
    习近平强调，这个世界是一体的，各国应该相互合作，而不应该寻求“脱钩”。要反对将经贸问题政治化，维护全球产业链供应链稳定。中方愿同荷方维护和践行真正的多边主义，坚持经济全球化正确方向，维护以世贸组织为核心的多边贸易体制，共同营造有利于发展的国际环境。希望荷方推动欧洲坚持开放合作，为促进中欧关系健康稳定发展发挥积极作用。
    吕特表示，很高兴在荷中建立大使级外交关系50周年这一特殊年份同习近平主席再次见面。双方举行了多项庆祝活动，中国古典文学名著《红楼梦》首次被翻译成荷兰文。荷方对习近平主席2014年对荷兰进行的成功国事访问记忆犹新，希望同中方密切交往，保持双边关系发展的强劲势头。荷方愿同中方着眼大局，挖掘潜力，拓展创新、气候变化等领域对话与合作，推动两国关系在未来50年取得更大成就。
  </mask>
</effects>
`)

