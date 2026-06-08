import React from 'react';

interface CompilerOutput {
    bytecode: string;
    abi: any[];
    errors: string[];
}

interface CompilerProps {
    output: CompilerOutput;
}

export const CompilerOutput: React.FC<CompilerProps> = ({ output }) => {
    return (
        <div className="compiler-output">
            {output.errors.length > 0 && (
                <div className="errors">
                    <h4>Errors:</h4>
                    <ul>
                        {output.errors.map((err, i) => (
                            <li key={i} className="error">{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {output.bytecode && (
                <div className="success">
                    <h4>Compilation Successful</h4>
                    <div className="output-section">
                        <strong>Bytecode:</strong>
                        <pre className="bytecode">{output.bytecode}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompilerOutput;