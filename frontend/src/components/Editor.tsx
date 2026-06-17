import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { useTheme } from '../ThemeContext';

export const ContractEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (editorRef.current && !monacoInstance.current) {
            monacoInstance.current = monaco.editor.create(editorRef.current, {
                value: `// SPDX-License-Identifier: MIT
pragma nfx ^1.0.0;

contract SimpleToken {
    string public name;
    string public symbol;
    
    constructor() {
        name = "My Token";
        symbol = "MTK";
    }
}`,
                language: 'nfx',
                theme: theme === 'dark' ? 'vs-dark' : 'vs',
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
            });

            monaco.languages.register({ id: 'nfx' });
            monaco.languages.setMonarchTokensProvider('nfx', {
                keywords: [
                    'contract', 'function', 'modifier', 'constructor', 'event',
                    'string', 'uint64', 'uint256', 'int', 'int64', 'bool', 'address',
                    'mapping', 'public', 'private', 'internal', 'external', 'payable',
                    'returns', 'require', 'emit', 'if', 'else', 'for', 'while',
                    'true', 'false', 'memory', 'storage', 'new'
                ],
                tokenizer: {
                    root: [
                        [/[{}()<>]/, '@brackets'],
                        [/[;,.]/, 'delimiter'],
                        [/[ \t\r\n]+/, 'white'],
                        [/(".*?"|'.*?')/, 'string'],
                        [/[0-9]+\.?[0-9]*/, 'number'],
                        [/[a-zA-Z_]\w*/, {
                            cases: {
                                '@keywords': 'keyword',
                                '@default': 'identifier'
                            }
                        }]
                    ]
                }
            });
        }

        return () => {
            if (monacoInstance.current) {
                monacoInstance.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (monacoInstance.current) {
            monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
        }
    }, [theme]);

    return <div ref={editorRef} style={{ height: '100%', width: '100%' }} className="editor-container" />;
};

export default ContractEditor;