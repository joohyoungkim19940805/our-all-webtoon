export const handleScrollWheelX = (
    event: React.WheelEvent,
    ref: React.RefObject<HTMLUListElement>,
) => {
    if (!ref.current || ref.current.hasAttribute('data-is_shft')) return;
    let { deltaY } = event;

    ref.current.scrollTo(ref.current.scrollLeft + deltaY, 0);
};
