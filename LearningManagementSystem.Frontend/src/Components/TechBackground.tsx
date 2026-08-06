const techs = [
    'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'C',
    'Go', 'Rust', 'Kotlin', 'Swift', 'PHP', 'SQL', 'MongoDB', 'MySQL',
    'PostgreSQL', 'SQLite', 'Redis', 'Node.js', 'Express', 'ASP.NET',
    'Angular', 'Vue',
]

function TechBackground() {
    return (
        <div className="tech-background">
            {techs.map((tech, i) => (
                <span
                    key={tech}
                    className={i % 2 === 0 ? 'tech-item move-up' : 'tech-item move-down'}
                    style={{
                        left: `${(i * 4.2) % 95}%`,
                        animationDuration: `${16 + (i % 10)}s`,
                        animationDelay: `${(i % 5) * -3}s`,
                    }}
                >
                    #{tech}
                </span>
            ))}
        </div>
    )
}

export default TechBackground