for file in public/heroesimage/*
do
cwebp -q 80 "$file" -o "${file::(-4)}.webp"
done
