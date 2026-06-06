# Convert/Subset fonts to webfonts

Subset + convert the font to WOFF2 using fonttools:

- Inside the `fonts` directory, install fonttools and brotli:
```bash
.\venv\Scripts\activate
pip install fonttools brotli
```
- Subset and convert the font:
```bash
pyftsubset NotoSansCJKsc-Regular.otf --output-file=../src/assets/fonts/NotoSansCJK-Regular.woff2 --flavor=woff2 --text-file=cjk.txt --desubroutinize
pyftsubset SymbolsNerdFontMono-Regular.ttf --output-file=../src/assets/fonts/SymbolsNerdFontMono-Regular.woff2 --flavor=woff2 --text-file=symbols.txt --desubroutinize
```

**Known Issue:** The `PfEd NOT subset` warning can be ignored as it usually has no runtime impact.  