import React, { useEffect, useRef } from 'react';
import '../style/bouncingballs.css';

function Ball({ id }) {
    return <div className="ball" id={`ball-${id}`}></div>;
};

export default function BouncingBalls() {

    const containerRef = useRef(null);
    const balls = Array.from({ length: 7 }, (_, i) => i);

    useEffect(() => {
        const container = containerRef.current;
        const balls = Array.from(container.getElementsByClassName('ball'));

        const ballProps = balls.map((ball) => {
            return {
                el: ball,
                x: Math.random() * container.clientWidth,
                y: Math.random() * container.clientHeight,
                dx: Math.random() * 1,
                dy: Math.random() * 1,
            };
        });

        const update = () => {
            ballProps.forEach((ball) => {
                ball.x += ball.dx;
                ball.y += ball.dy;

                if (ball.x + ball.el.clientWidth > container.clientWidth || ball.x < 0) {
                    ball.dx *= -1;
                }

                if (ball.y + ball.el.clientHeight > container.clientHeight || ball.y < 0) {
                    ball.dy *= -1;
                }

                ball.el.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
            });

            requestAnimationFrame(update);
        };

        update();
    }, []);

    return (

        <div className="ballContainer" ref={containerRef}>
            {balls.map((id) => (
                <Ball key={id} id={id} />
            ))}
        </div>

    );
};