# שלב הבנייה
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# העתק את קבצי הפרויקט
COPY *.csproj./
RUN dotnet restore

# העתק את כל הקבצים ובנה את האפליקציה
COPY . ./
RUN dotnet publish -c Release -o /out

# שלב הריצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from= build /out .

# פתח את הפורט שבו ה-Backend יאזין
EXPOSE 7009
ENTRYPOINT["dotnet", "ExchangeRates.dll"]
