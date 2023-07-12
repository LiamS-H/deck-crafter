import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

import { ICard } from "../../../types/card";
import CardGroup from "../card-group";

export default function CardGroupGrid(props : {groups : {name: string;cards: ICard[];}[]}) {
    const layouts = {
        lg: [
            { i: "a", x: 0, y: 0, w: 3, h: 1,},
          ],
    }
    console.log(layouts)
    
    let y_level = 0;
    let x_level = 0;
    for (let group of props.groups) {
        const height = group.cards.length + 1
        layouts.lg.push({
            i: group.name,
            x: x_level,
            y: y_level,
            w: 1,
            h: height,
        })
        y_level += height
        if (y_level > 20) {
            x_level += 1
            y_level = 0
        }
    }

    const dispGroups = props.groups.map((group)=><div key={group.name}><CardGroup group={group} /> </div>)
    
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480}}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1}}
        rowHeight={12} //the actual rowHeight used is +7
        isResizable={false}
      >
        {dispGroups}
      </ResponsiveGridLayout>
    );
}