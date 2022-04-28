//https://github.com/arco-design/arco-design/blob/07deaac6082b7d69cdd2be9a78f4f4a89f3c560f/components/TimePicker/util.ts#L23

import BTween from '../../_util/b-tween';


const scrollIds = new Map<HTMLElement, number>();

export function scrollTo(element: HTMLElement, to: number, duration: number) {
    if (scrollIds.get(element)) {
        cancelAnimationFrame(scrollIds.get(element) as number);
    }

    if (duration <= 0) {
        element.scrollTop = to;
    }

    scrollIds.set(
        element,
        requestAnimationFrame(() => {
            //@ts-ignore
            const tween = new BTween({
                from: { scrollTop: element.scrollTop },
                to: { scrollTop: to },
                duration,
                onUpdate: (keys: any) => {
                    element.scrollTop = keys.scrollTop;
                },
                easing: 'quartInOut',
            });
            tween.start();
        })
    );
}