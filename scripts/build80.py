from pathlib import Path
r=Path(__file__).resolve().parents[1]
s=(r/'js/engine80.js').read_text()
modules='const engineSave80=()=>save();\n'+'\n'.join((r/f'js/{i:02}.js').read_text() for i in range(21,36))
s=s.replace('/* EXPANSION80_MODULES */',modules)
(r/'js/17.js').write_text(s)
print('Built engine + modules 21–35')
